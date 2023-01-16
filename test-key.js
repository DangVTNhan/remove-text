import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import { Delete, DoneSharp } from '@material-ui/icons';
import { useToast } from '@thuocsi/nextjs-components/toast/useToast';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTransportingClient } from '@ts-ops/client';
import { Carrier } from '@ts-ops/model';
import {
  hourToSecond,
  listTypeLeadTime,
  ResponseStatus
} from '@ts-ops/utils/constants';
import { useAlert } from '@ts-ops/components/hooks/alert';

export const mappingFilterConfig = [
  {
    value: 'provinceCode',
    title: 't(Fix me)'
  },
  {
    value: 'districtCode',
    title: 't(Fix me)'
  },
  {
    value: 'wardCode',
    title: 't(Fix me) t(Fix me)/Xã'
  }
];
export const ConfigTable = (props) => {
  const router = useRouter();
  const {
    dataLeadTime,
    listMasterData,
    listCarrier,
    tableFor,
    currentWarehouse
  } = props;
  const [isEdit, setIsEdit] = useState([]);
  const { register, getValues } = useForm();
  const { error, success } = useToast();
  const [leadTimeData, setLeadTimeData] = useState(dataLeadTime || []);
  const alert = useAlert();
  useEffect(() => {
    setLeadTimeData(dataLeadTime || []);
  }, [dataLeadTime]);
  const handleChangeCell = ({ addressCode, carrierCode }) => {
    let tmpArrayEdit = [];
    tmpArrayEdit.push({
      addressCode,
      carrierCode
    });
    setIsEdit([...tmpArrayEdit]);
  };
  const handleConfirmClearData = (toCode, carrierCode, commitmentTime) => {
    alert.actions('t(Fix me)', '', 't(Fix me)', () =>
      handleClearLeadTimeData(toCode, carrierCode, commitmentTime)
    );
  };
  const handleClearLeadTimeData = async (
    toCode,
    carrierCode,
    commitmentTime
  ) => {
    let checkLevel = 1;
    switch (tableFor) {
      case 'provinceCode':
        checkLevel = 1;
        break;
      case 'districtCode':
        checkLevel = 2;
        break;
      case 'wardCode':
        checkLevel = 3;
        break;
    }
    let dataNew = {
      level: +checkLevel,
      carrierCode,
      toCode: toCode,
      toName: listMasterData.find((address) => address.code == toCode)?.name,
      fromCode: currentWarehouse[`${tableFor}`],
      fromName: currentWarehouse?.name,
      commitmentTime: +commitmentTime * hourToSecond,
      type: router.query?.typeLeadTime || listTypeLeadTime.DELIVERING,
      active: false
    };
    let resGetCurrentConfig = await getTransportingClient(
      null,
      {}
    ).createLeadTimeConfig(dataNew);
    if (resGetCurrentConfig.status == 'OK') {
      success('Xóa giá trị đã thiết lập thành công!');

      return router.reload();
    } else {
      error('t(Fix me) thể xóa thiết lập. ' + resGetCurrentConfig.message);
      return;
    }
  };
  const handleKeyPress = async (toCode, carrierCode) => {
    let key = `commitmentTime_${toCode}_${carrierCode}`;
    let currentValue = getValues()[`${key}`];
    if (currentValue == '') {
      return error('t(Fix me) không được để trống hoặc sai định dạng!');
    }
    if (+currentValue <= 0) {
      return error('t(Fix me) không được nhỏ hơn hoặc bằng 0!');
    }
    let checkLevel = 1;
    switch (tableFor) {
      case 'provinceCode':
        checkLevel = 1;
        break;
      case 'districtCode':
        checkLevel = 2;
        break;
      case 'wardCode':
        checkLevel = 3;
        break;
    }
    let dataNew = {
      level: +checkLevel,
      carrierCode,
      toCode: toCode,
      toName: listMasterData.find((address) => address.code == toCode)?.name,
      fromCode: currentWarehouse[`${tableFor}`],
      fromName: currentWarehouse?.name,
      commitmentTime: +currentValue * hourToSecond,
      type: router.query?.typeLeadTime || listTypeLeadTime.DELIVERING,
      active: true
    };
    let resGetCurrentConfig = await getTransportingClient(
      null,
      {}
    ).createLeadTimeConfig(dataNew);

    if (resGetCurrentConfig.status == ResponseStatus.OK) {
      success('t(Fix me) lead-time thành công!');
      let currentData = leadTimeData?.find(
        (leadTime) =>
          leadTime.toCode == toCode &&
          leadTime.carrierCode == carrierCode &&
          leadTime.fromCode == currentWarehouse[`${tableFor}`]
      );
      if (currentData?.commitmentTime) {
        currentData.commitmentTime = +currentValue * hourToSecond;
        setLeadTimeData([...leadTimeData]);
      } else {
        setLeadTimeData([...leadTimeData, dataNew]);
      }
      return setIsEdit([]);
    } else {
      error(
        `t(Fix me) lead-time không thành công!. ${resGetCurrentConfig.message}`
      );
    }
  };

  const generateName = () => {
    let level = router.query?.level ? +router.query?.level : 1;
    switch (tableFor) {
      case 'provinceCode':
        level = 1;
        break;
      case 'districtCode':
        level = 2;
        break;
      case 'wardCode':
        level = 3;
        break;
    }
    switch (level) {
      case 1:
        return 'tỉnh';
      case 2:
        return 'quận';
      case 3:
        return 'huyện';
    }
  };

  const handleConfigChildren = async (addressCode) => {
    if (tableFor == 'wardCode') return;
    let level = router.query?.level ? +router.query?.level : 1;
    switch (tableFor) {
      case 'provinceCode':
        level = 2;
        break;
      case 'districtCode':
        level = 3;
        break;
      default:
        level = 1;
        break;
    }
    let queryAddress = router.query?.queryAddress
      ? JSON.parse(router.query?.queryAddress as string)
      : [];

    if (!queryAddress?.find((address) => address.label == tableFor)) {
      queryAddress.push({
        label: tableFor,
        addressCode: addressCode
      });
    } else {
      let queryCurrent = queryAddress?.find(
        (address) => address.label == tableFor
      );
      queryCurrent.label = tableFor;
      queryCurrent.addressCode = addressCode;
    }
    if (queryAddress.length > 1) {
      if (tableFor == 'provinceCode') {
        queryAddress = queryAddress.filter(
          (address) => address.label == tableFor
        );
      }
    }
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        level: level,
        queryAddress: JSON.stringify(queryAddress)
      }
    });
  };
  return (
    <TableContainer>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableCell>Mã {generateName()}</TableCell>
          <TableCell>t(Fix me) {generateName()}</TableCell>
          {listCarrier.map((carrier: Carrier) => (
            <TableCell key={carrier.carrierCode}>
              {carrier.carrierName}
            </TableCell>
          ))}
        </TableHead>
        <TableBody
          onMouseLeave={() => {
            setIsEdit([]);
          }}
        >
          {listMasterData?.map((item) => (
            <TableRow key={item.code} hover>
              <TableCell width={'5%'}>{item.code}</TableCell>
              <TableCell
                width={'15%'}
                style={{ cursor: 'pointer' }}
                onClick={() => handleConfigChildren(item.code)}
              >
                {item.name}
              </TableCell>
              {listCarrier.map((carrier: Carrier) => (
                <TableCell
                  key={carrier.carrierCode}
                  style={{ cursor: 'pointer' }}
                  width={`${80 / listCarrier.length}%`}
                  onClick={(e) => {
                    if (
                      ['TD', 'SPAN', 'span'].includes(
                        (e.target as HTMLElement)?.tagName
                      )
                    ) {
                      handleChangeCell({
                        addressCode: item.code,
                        carrierCode: carrier.carrierCode
                      });
                    }
                  }}
                >
                  {isEdit.find(
                    (editing) =>
                      editing.carrierCode == carrier.carrierCode &&
                      editing['addressCode'] == item.code
                  ) ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <TextField
                          name={`commitmentTime_${item.code}_${carrier.carrierCode}`}
                          inputRef={register}
                          autoFocus={true}
                          size={'small'}
                          style={{ width: '90%' }}
                          onKeyPress={(e) =>
                            e.key == 'Enter' &&
                            handleKeyPress(item.code, carrier.carrierCode)
                          }
                          defaultValue={
                            leadTimeData?.find(
                              (leadTime) =>
                                leadTime.toCode == item.code &&
                                leadTime.carrierCode == carrier.carrierCode
                            )?.commitmentTime / hourToSecond || ''
                          }
                          type={'tel'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                (h)
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                      <IconButton
                        size={'small'}
                        color={'primary'}
                        onClick={() =>
                          handleKeyPress(item.code, carrier.carrierCode)
                        }
                      >
                        <DoneSharp style={{ fontSize: 16 }} />
                      </IconButton>
                    </div>
                  ) : (
                    <span>
                      <span>
                        {leadTimeData?.find(
                          (leadTime) =>
                            leadTime.toCode == item.code &&
                            leadTime.carrierCode == carrier.carrierCode &&
                            leadTime?.active == true
                        )?.commitmentTime / 3600 || '-'}
                      </span>
                      {leadTimeData?.find(
                        (leadTime) =>
                          leadTime.toCode == item.code &&
                          leadTime.carrierCode == carrier.carrierCode &&
                          leadTime?.active == true
                      ) ? (
                        <>
                          <span style={{ marginLeft: 20 }}>
                            <IconButton
                              color={'secondary'}
                              onClick={() =>
                                handleConfirmClearData(
                                  item.code,
                                  carrier.carrierCode,
                                  leadTimeData?.find(
                                    (leadTime) =>
                                      leadTime.toCode == item.code &&
                                      leadTime.carrierCode ==
                                        carrier.carrierCode &&
                                      leadTime?.active == true
                                  )?.commitmentTime
                                )
                              }
                            >
                              <Delete style={{ fontSize: 18 }} />
                            </IconButton>
                          </span>
                        </>
                      ) : (
                        ''
                      )}
                    </span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

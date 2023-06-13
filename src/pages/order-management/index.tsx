import { useEffect, useState } from "react";
import Sidebar from "../../components/atoms/sidebar";
import OrdersTable from "../../components/organisms/orders-table";
import { NavItems } from "../../utils/admin-navitems";
import { useDispatch } from "react-redux";
import {
  getSingleOrder,
  getTableDataOrders,
} from "../../redux/thunks/orders-thunk";
import { useSelector } from "react-redux";

/**
 * Usage - This component will be used for admin order management manipulations.
 *
 * Description - The component is build based on custom components
 *
 */

const OrderManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { crudOperations } = useSelector((state: any) => state);
  const [tableType, setTableType] = useState<"default" | "more-info">(
    "default"
  );
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (tableType == "default") {
      dispatch(getTableDataOrders() as any);
    } else {
      dispatch(getSingleOrder(orderId) as any);
    }
  }, [dispatch, tableType]);

  const handleViewMoreInfo = (orderId: string) => {
    tableType == "default"
      ? setTableType("more-info")
      : setTableType("default");
    setOrderId(orderId);
  };

  return (
    <>
      <Sidebar
        appBarTitle="Craft E-Commerce Admin Dashboard"
        routes={NavItems}
      />
      <OrdersTable
        handleViewMoreInfo={handleViewMoreInfo}
        orderData={crudOperations.dataSet}
        type={tableType}
        orderMoreInfo={crudOperations.data}
      />
    </>
  );
};

export default OrderManagement;

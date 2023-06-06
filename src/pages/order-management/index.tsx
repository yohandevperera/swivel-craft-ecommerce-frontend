import Sidebar from "../../components/atoms/sidebar";
import OrdersTable from "../../components/organisms/orders-table";
import { NavItems } from "../../utils/admin-navitems";

/**
 * Usage - This component will directly call the PageHelmet, Header and CraftDataView components.
 *
 * Description - The component is build based on custom components
 *
 */

const OrderManagement: React.FC = () => (
  <>
    <Sidebar appBarTitle="Craft E-Commerce Admin Dashboard" routes={NavItems} />
    <OrdersTable
      handleViewMoreInfo={() => {}}
      orderData={[
        {
          _id: "sd",
          email: "123",
          itemCount: 1,
          orderId: "12",
          totalPrice: 10,
        },
      ]}
    />
  </>
);

export default OrderManagement;

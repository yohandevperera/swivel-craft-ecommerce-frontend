import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { OrderTableType } from "../../../services/orders";

interface OrdersTableProps {
  orderData: OrderTableType[];
  handleViewMoreInfo: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = (props) => {
  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          width: "90%",
          marginLeft: 108,
          marginTop: 70,
          borderRadius: 10,
        }}
      >
        <Table sx={{ minWidth: 650, marginTop: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Ordered Email</TableCell>
              <TableCell align="right">View More Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orderData.map((order: OrderTableType) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.orderId}
                </TableCell>
                <TableCell align="right"> {order.totalPrice}</TableCell>
                <TableCell align="right"> {order.email}</TableCell>
                <TableCell align="right">
                  {" "} 
                  <Button
                    disableRipple
                    onClick={() => props.handleViewMoreInfo(order._id)}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTable;

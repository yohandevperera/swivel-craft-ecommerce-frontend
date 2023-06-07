import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { OrderMoreInfoType, OrderTableType } from "../../../services/orders";
import _ from "lodash";

interface OrdersTableProps {
  orderData: OrderTableType[];
  handleViewMoreInfo: (orderId: string) => void;
  type: "default" | "more-info";
  orderMoreInfo: OrderMoreInfoType[];
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
              {props.type == "default" ? (
                <>
                  <TableCell>Order Id</TableCell>
                  <TableCell align="right">Total Price</TableCell>
                  <TableCell align="right">Ordered Email</TableCell>
                  <TableCell align="right">View More Info</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="right">Order Id</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Item Price</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.type == "default" ? (
              <>
                {_.isEmpty(props.orderData) ? (
                  <CircularProgress />
                ) : (
                  props.orderData.map((order: OrderTableType) => (
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
                  ))
                )}
              </>
            ) : (
              <>
                {_.isEmpty(props.orderMoreInfo) ? (
                  <CircularProgress />
                ) : (
                  props.orderMoreInfo.map(
                    (order: OrderMoreInfoType, index: number) => {
                      console.log(order);
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {order.orderId}
                          </TableCell>
                          <TableCell align="right"> {order.itemName}</TableCell>
                          <TableCell align="right">
                            {" "}
                            {order.itemPrice}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTable;

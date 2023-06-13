import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

/**
 * Usage - This component is used for to display the statistics such as top sales and total sales
 *
 * Description - The component is build based HTML components and material ui components
 *
 * @props type @typedef "top-sales" | "total-sales"
 * @props info @typedef string | number
 */

const StatisticCard: React.FC<{
  type: "top-sales" | "total-sales";
  info: string | number;
}> = (props) => {
  return (
    <>
      <Card style={{ marginLeft: 100, marginTop: 100 }}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {props.type === "top-sales" ? "Top Sales" : "Total Sales"}
              </Typography>
              <Typography variant="h4">{props.info}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                {props.type === "total-sales" ? (
                  <AttachMoneyIcon />
                ) : (
                  <TrendingDownIcon />
                )}
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default StatisticCard;

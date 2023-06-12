import StatisticCard from "../../components/atoms/statistic-card";
import Sidebar from "../../components/atoms/sidebar";
import { NavItems } from "../../utils/admin-navitems";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import _ from "lodash";
import { getTopSales, getTotalSales } from "../../services/orders";

const AdminHomepage: React.FC = () => {
  const [topSales, setTopSales] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);

  const getTotalSalesCount = () => {
    getTotalSales()
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("error get order response null");
        }
        setTotalSales(response.data.data.totalSales);
      })
      .catch((error) => {
        throw Error(error.message);
      });
  };

  const getTopSalesCount = () => {
    getTopSales()
      .then((response) => {
        if (_.isEmpty(response) || _.isNull(response)) {
          throw Error("error get order response null");
        }
        setTopSales(response.data.data.topSales);
      })
      .catch((error) => {
        throw Error(error.message);
      });
  };

  useEffect(() => {
    getTopSalesCount();
    getTotalSalesCount();
  }, []);

  return (
    <>
      <Sidebar
        appBarTitle="Craft E-Commerce Admin Dashboard"
        routes={NavItems}
      />

      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ marginLeft: -30, marginTop: 130 }}
      >
        <Grid item xs={5}>
          <StatisticCard info={topSales} type="top-sales" />
        </Grid>
        <Grid item xs={5}>
          <StatisticCard info={totalSales} type="total-sales" />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHomepage;

import { Container, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CraftGrid from "../../organisms/crafts-grid";
import CircularProgress from "@mui/material/CircularProgress";
import _ from "lodash";
import "react-toastify/dist/ReactToastify.min.css";
// import { loadAllCrafts } from "../../../redux/reducers/crafts/crafts-thunks";

/**
 * Usage - This component is used for to manipulate the craft data view.
 *
 * Description - The component is build based on the Material Ui components and custom components
 *
 */

const CraftDataView: React.FC = () => {
  const dispatch = useDispatch();
  const craftData = useSelector((state: any) => state.crafts);

  useEffect(() => {
    // dispatch(loadAllCrafts() as any);
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 10, mb: 10, marginTop: 2, position: "relative" }}>
        {craftData.isLoading ||
        _.isEmpty(craftData.crafts) ||
        _.isNull(craftData.crafts) ? (
          <CircularProgress
            style={{
              marginLeft: "50%",
              marginTop: "10%",
            }}
          />
        ) : (
          <>
            <CraftGrid
              gridData={craftData.crafts}
              gridDir={"row"}
              handleAddToCart={() => {}}
            />
          </>
        )}
      </Card>
    </Container>
  );
};

export default CraftDataView;

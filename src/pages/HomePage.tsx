import { Stack, Typography, useTheme } from "@mui/material";
import BlackFridayBanner from "../assets/images/BlackFridayBanner.jpg";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/slices/categorySlice";
import { useScreenSizes } from "../hooks/useScreenSizes";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const categories = useSelector(selectCategories);
  const theme = useTheme();
  const { isMediumScreen, isLargeScreen, isSmallScreen } = useScreenSizes();
  const navigate = useNavigate();
  console.log(categories);
  return (
    <Stack
      sx={{
        minHeight: "var(--body-min-height)",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <img
        src={BlackFridayBanner}
        style={{
          maxWidth: "100%",
          maxHeight: "700px",
          objectFit: "cover",
        }}
        alt="Logo"
      />
      <Stack
        gap={"30px"}
        sx={{ padding: isLargeScreen ? "40px 40px" : "40px 100px" }}
      >
        <Typography variant="h4" color={"text.primary"}>
          Shop by Categories
        </Typography>
        <Stack direction={"row"} gap={"40px"} flexWrap={"wrap"}>
          <Stack alignItems={"center"} gap={"5px"}>
            <img
              src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{
                width: "165px",
                height: "165px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => navigate("/product")}
            />
            <Typography variant="body1" color={"text.primary"}>
              See all products
            </Typography>
          </Stack>
          {categories.map((category: any) => {
            return (
              <Stack alignItems={"center"} gap={"5px"}>
                <img
                  src={category.image}
                  style={{
                    width: "165px",
                    height: "165px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/product")}
                />
                <Typography variant="body1" color={"text.primary"}>
                  {category.name}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HomePage;

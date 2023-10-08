import { Stack, Typography } from "@mui/material";
import hourglass from "../assets/images/loading-loading-forever.gif";

export default function Loading() {
  return (
    <Stack
      padding={"0 50px"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      zIndex={10}
      margin={"0 auto"}
    >
      <img src={hourglass} alt="" style={{ height: "100px" }} />
      {/* <Typography
        variant="h1"
        fontSize={20}
        paddingTop={"20px"}
        color={"#E69F56"}
        sx={{
          fontFamily: "Pacifico, cursive",
        }}
      >
        Finding your products... <br></br> Please wait 😉
      </Typography> */}
    </Stack>
  );
}

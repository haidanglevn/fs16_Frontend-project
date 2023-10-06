import { useParams } from "react-router-dom";

export default function ProductSingle() {
  const params = useParams();
  console.log("Single page params: ", params);
  return <div>ProductSingle</div>;
}

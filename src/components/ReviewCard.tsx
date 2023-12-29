import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import { Review, User } from "../types/generalTypes";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewCard(review: Review) {
  const [user, setUser] = useState<User | null>(null);
  console.log(review);
  useEffect(() => {
    axios
      .get(`http://localhost:5173/api/users/${review.userId}/simple`)
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const convertDateTime = (string: string) => {
    let dateObject = new Date(string);

    let formattedDate = dateObject.toLocaleDateString();

    return formattedDate; // "Dec 28, 2023"
  };

  const convertStar = (rating: number) => {
    let string = "";
    if (rating > 5) {
      rating = 5;
    }
    for (let i = 0; i < rating; i++) {
      string += "⭐";
    }
    return string;
  };

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={user?.avatar}>
            U
          </Avatar>
        }
        title={`${user?.firstName} ${user?.lastName}`}
        subheader={convertDateTime(review.createdAt.toString())}
      />
      <CardContent>
        <Typography>{convertStar(review.rating)}</Typography>
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

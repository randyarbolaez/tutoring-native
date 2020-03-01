import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as postActions from "../store/actions/post-actions";

const PostCard = props => {
  const dispatch = useDispatch();

  let dateCreated = props.created_at;
  let d = new Date(dateCreated);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();

  const onHandleDelete = id => {
    try {
      dispatch(postActions.deletePost(id));
      props.loadPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.dateMade}>{`${month} ${day}, ${year}`}</Text>
      {props.user === props.currentUser.userId ? (
        <Button
          title="Delete"
          color="#FF99C8"
          onPress={() => onHandleDelete(props._id)}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    // display: "flex"
    backgroundColor: "red",
    margin: "2% 2%",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
    padding: "4%",
    // width: "20%",
    backgroundColor: "#E4C1F9",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#FCF6BD"
  },
  description: {
    textAlign: "center",
    color: "#a3a3a3"
  },
  dateMade: {
    color: "#f1f2eb",
    textAlign: "center"
  }
});

export default PostCard;

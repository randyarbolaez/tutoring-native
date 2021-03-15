import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as postActions from "../store/actions/post-actions";

const PostCard = (props) => {
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
    "December",
  ];
  let month = months[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();

  const onHandleDelete = (id) => {
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
    display: "flex",
    margin: "2% 2%",
    //boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    // borderTopEndRadius: "20%",
    borderTopEndRadius:20,
    borderColor: "#DB7093",
    borderWidth: 1,
    borderBottomColor: "#FFD6C0",
    borderBottomWidth: 1,
    borderRightColor: "#FFD6C0",
    borderRightWidth: 1,
    // borderTopStartRadius: "10%",
    borderTopStartRadius: 10,
    //borderBottomStartRadius: "25%",
    //borderBottomEndRadius: "10%",
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 10,
    padding: "4%",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#DB7093",
  },
  description: {
    textAlign: "center",
    color: "#FFB6C1",
  },
  dateMade: {
    color: "#74776B",
    textAlign: "center",
    paddingTop: 5,
    // paddingBottom: 1,
  },
});

export default PostCard;

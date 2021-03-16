import React from "react";
import { View, ScrollView, Text, Button, StyleSheet,TouchableOpacity,Alert } from "react-native";
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
    <>
    {props.user === props.currentUser.userId ? (
      <TouchableOpacity style={{...styles.wrapper}} 
      onLongPress={() => {
        Alert.alert(
          "Are you sure you want to delete this post?",
          "",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text:"Yes",
              style:"destructive",
              onPress:() => onHandleDelete(props._id),
            },
          ],
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                "This alert was dismissed by tapping outside of the alert dialog."
              ),
          }
        );
        }
      } 
      delayLongPress={300}
      >
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <View style={{...styles.dateMade, 
        borderColor:'#ce2029',
        borderBottomWidth:"4",}}
      >
      <Text style={styles.dateMade}>{`${month} ${day}, ${year}`}</Text>
      </View>
    </TouchableOpacity>
    ): (<View style={styles.wrapper}> 
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.description}>{props.description}</Text>
    <View style={styles.dateMade}>
      <Text >{`${month} ${day}, ${year}`}</Text>
    </View>
    
    </View>)}
    </>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    backgroundColor:"#F8F7FF",
    margin:"4%",
    borderRadius:10,
    // height:50,
    // margin: "2% 2%",
    //boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    // borderTopEndRadius: "20%",
    // borderTopEndRadius:20,
    // borderColor: "#DB7093",
    // borderWidth: 1,
    // borderBottomColor: "#FFD6C0",
    // borderBottomWidth: 1,
    // borderRightColor: "#FFD6C0",
    // borderRightWidth: 1,
    // borderTopStartRadius: "10%",
    // borderTopStartRadius: 10,
    //borderBottomStartRadius: "25%",
    //borderBottomEndRadius: "10%",
    // borderBottomStartRadius: 25,
    // borderBottomEndRadius: 10,
    // padding: "4%",
  },
  title: {
    paddingTop:"3%",
    fontSize: 20,
    textAlign: "center",
    color: "#DB7093",
    color: "#1F1300",
  },
  description: {
    textAlign: "center",
    color: "#FF7700",
    fontSize:15,
    paddingTop:"2%",
    paddingBottom:"2%",
  },
  dateMade: {
    color: "#74776B",
    color: "#1F1300",
    textAlign: "center",
    paddingTop: "2%",
    paddingBottom:"2%",
    backgroundColor:'#CEDADA',
    marginLeft:"20%",
    marginRight:"20%",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    alignItems:'center',
  },
});

export default PostCard;

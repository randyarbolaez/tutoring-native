import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, FlatList } from "react-native";

import PostCard from "./PostCard";
import * as postActions from "../store/actions/post-actions";

const Post = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector(state => state.post.searchPosts);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(state => state.auth);

  const loadPosts = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(postActions.fetchPosts());
    } catch (err) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <FlatList
      onRefresh={loadPosts}
      refreshing={isRefreshing}
      data={posts}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <PostCard
            currentUser={isUserLoggedIn}
            {...itemData.item}
            loadPost={loadPosts}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap"
  }
});

export default Post;

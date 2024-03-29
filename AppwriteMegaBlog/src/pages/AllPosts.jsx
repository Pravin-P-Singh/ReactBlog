import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:flex md:flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-1 w-full md:p-2 md:w-1/4">
              {post.status === "inactive" ? post?.userId === userData?.$id && <PostCard {...post} /> : <PostCard {...post} />}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

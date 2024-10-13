import React, { useEffect, useState } from "react";

import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useGetCurrentUser,
  useDeleteSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";

type PostStatsProps = {
  userId: string;
  post: Models.Document;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { data: currentUser } = useGetCurrentUser();

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) newLikes = newLikes.filter((id) => id !== userId);
    else newLikes.push(userId);

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };

  return (
    <div className="z-20 flex items-center justify-between">
      <div className="flex gap-2 mr-5">
        <img
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-5">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;

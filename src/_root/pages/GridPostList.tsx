import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type GridPostListProps = {
  showUser?: boolean;
  showStats?: boolean;
  posts: Models.Document[];
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/post/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post-img"
              className="object-cover w-full h-full"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start flex-1 gap-2">
                <img
                  src={post.creator.imageUrl}
                  alt="user-img"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}

            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;

import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useRef } from "react";
import { sanitazeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const dispatch = useDispatch();

  const onSave = () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newContent = sanitazeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newContent,
      })
    ).then(() => navigate(`/post/${id}`));
  };
  return (
    <div className={className}>
      <Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение" />
      <Input ref={titleRef} defaultValue={title} placeholder="Заголовок" />
      <SpecialPanel
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon id="fa-floppy-o" margin="0 6px 0 0" onClick={onSave} />
        }
      />
      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & img {
    float: left;
    margin: 0 20px 20px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;

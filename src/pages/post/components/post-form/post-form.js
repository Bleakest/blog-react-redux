import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useLayoutEffect, useRef, useState } from "react";
import { sanitazeContent } from "./utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";

const PostFormContainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(title);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const dispatch = useDispatch();

  const onSave = () => {
    const newContent = sanitazeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then(({ id }) => navigate(`/post/${id}`));
  };

  const onImageChange = ({ target }) => setImageUrlValue(target.value);
  const onTitleChange = ({ target }) => setTitleValue(target.value);
  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        onChange={onImageChange}
        placeholder="Изображение"
      />
      <Input
        value={titleValue}
        onChange={onTitleChange}
        placeholder="Заголовок"
      />
      <SpecialPanel
        id={id}
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
    min-height: 100px;
    border: 1px solid #000;
    font-size: 18px;
    white-space: pre-line;
  }
`;

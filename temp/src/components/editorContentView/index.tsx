import { FC } from 'react';
import './view.css';

interface EditorContentViewProps {
  html: string;
}
export const EditorContentView: FC<EditorContentViewProps> = ({ html }) => {
  return (
    <>
      <div
        className="editor-content-view"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </>
  );
};
export default EditorContentView;

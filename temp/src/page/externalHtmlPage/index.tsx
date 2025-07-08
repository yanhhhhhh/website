import { getExternalHtmlById } from '@/api/agrreement';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const DefaultTitle = 'HeroEE｜Hithium';
const ExternalHtmlPage = () => {
  const param = useParams<{ id: string }>();

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!param.id) return;
    getExternalHtmlById(param.id).then((data) => {
      const title = data.match(/<title>(.*?)<\/title>/);
      // 新开页面时，设置title
      if (title) {
        document.title = title[1];
      } else {
        document.title = DefaultTitle;
      }
      setHtmlContent(data);
    });
  }, [param.id]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ExternalHtmlPage;

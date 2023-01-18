import React, { useMemo, useState } from "react";

import { useEffect } from "react";
import { LoadingFiles } from "../Loading";
import style from "../../../../FileLayout.module.css";
import { useCallback } from "react";
import { driveId, proxyDomain } from "../../../../utils/constant";

export const FileLoading = (props) => { 
  const file = props?.file;
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState('');
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const parentUrl = proxyDomain + '/v1.0/drives/' + driveId + '/items/';
        
      const response = await fetch(parentUrl + file.id + "/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      
      return data.getUrl;
    } catch (error) {
      console.log(error);
      return '';
    }finally{
      setLoading(false);
    }
  }, [file]);
  
  useEffect(() => {
    if (file) {
      fetchData().then(res => setPath(res));
    } else {
      setPath('');
    }
  }, [file, fetchData]);
  return (
    <div className={style.center}>
      {!loading &&  
      <iframe src={path} title="your file preview" width='100%' height='700px' scrolling="no" frameBorder='0' >
      </iframe>}
      {loading && <LoadingFiles />}
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import imgData from 'dan-api/images/imgDataMasonry';
import { PhotoGallery } from 'dan-components';
import { GetProjectsRequest, GetTags } from './api';

function Photos() {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const title = brand.name + ' - Projects';
  const description = brand.desc;

  const getProjects = async () => {
    const {
      projects,
      total,
      pagination,
    } = await GetProjectsRequest(page, selectedTags);

    setProjects(projects);
    setPagination(pagination);
  };

  const getTags = async () => {
    const tags = await GetTags();
    if (tags && tags.length) {
      setTags(tags);
    }
  };

  useEffect(() => {
    getProjects();

    if (tags.length) {
      return;
    }

    getTags();
  }, [selectedTags, page]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PhotoGallery
        pagination={pagination}
        projects={projects}
        setProjects={setProjects}
        tags={tags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setPage={setPage}
      />
    </div>
  );
}

export default Photos;

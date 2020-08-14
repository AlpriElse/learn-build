// FIXME(Renzo): Eslint and prettier are disagreeing so this will have to do
/* eslint-disable comma-dangle */
import React from 'react';
import { Box } from '@chakra-ui/core';
import NavigationBar from '../components/NavigationBar';
import Hero from '../components/Hero';
import Container from '../components/Container';
import Builds from '../components/Builds';
import Tags from '../components/Tags';
import { fetchBuilds, fetchTags, fetchUsers } from '../clients';
import {
  BuildListProps,
  TagListProps,
  UserListProps,
} from '../constants/propTypes';

// TODO(Renzo): Add footer and another image somewhere

export default function Home({ builds, tags, users }) {
  // TODO(Renzo): Limit the amount of builds shown
  // TODO(Renzo): Limit the amount of tags shown - trending tags?
  const tagsToShow = 5;

  return (
    <div>
      <NavigationBar />
      <Hero
        headerText="Self-teaching done right."
        subText="Start building your way to learn."
      />
      <Container>
        <Box>
          <Builds
            header="Popular Builds"
            builds={builds}
            tags={tags}
            users={users}
          />
        </Box>

        <Box>
          <Tags
            header="Trending Tags"
            tags={tags.slice(0, tagsToShow)}
            showDescription={false}
          />
        </Box>
      </Container>
    </div>
  );
}

Home.propTypes = {
  builds: BuildListProps.isRequired,
  tags: TagListProps.isRequired,
  users: UserListProps.isRequired,
};

// TODO(Renzo): handle promises once data fetching returns actual data
export async function getStaticProps() {
  const allBuildsData = await fetchBuilds().then((r) => r.data);
  const builds = allBuildsData.map((b) => ({
    ...b,
    id: b._id,
    userId: b.user_id,
    favoriteCount: b.favorite_count,
    resourceIds: [],
    tagIds: [],
  }));

  const allTagsData = await fetchTags().then((r) => r.data);
  const tags = allTagsData.map((t) => ({
    ...t,
    id: t._id,
  }));

  const allUsersData = await fetchUsers().then((r) => r.data);
  const users = allUsersData.map((u) => ({
    ...u,
    id: u._id,
  }));

  return {
    props: {
      builds,
      tags,
      users,
    },
  };
}

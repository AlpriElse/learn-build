import { Heading } from "@chakra-ui/core";
import ResponsiveHeading from "./ResponsiveHeading";
import BuildCard from "./BuildCard";

function Builds({ builds, tags }) {

  // FIXME(Renzo): change this when data fetching actually pulls data?
  function getTagNames(build, tags) {
    const { tagIds } = build;
    const tagNames = tagIds.map((id) => {
      const foundTag = tags.find((tag) => tag.id === id);
      return foundTag.name;
    });
    return tagNames;
  }

  return (
    <div>
      <ResponsiveHeading>
        Builds
      </ResponsiveHeading>
      {builds.map((build) => (
        <BuildCard 
          key={build.id} 
          build={build} 
          tagNames={getTagNames(build, tags)} 
        />
      ))}
    </div>
  );
}

export default Builds;
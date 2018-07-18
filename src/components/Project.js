import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Icon,
  Text
} from '@hackclub/design-system'
import React from 'react'

const ProjectButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  box-shadow: none !important;
`

const Project = ({
  id,
  name,
  description,
  submitter,
  link,
  tagline,
  timestamp,
  upvotesCount,
  upvoteProject,
  isUpvoted,
  ...props
}) => (
  <Box key={id} p={3} width={[1 / 2, 1 / 3]}>
    <Card boxShadowSize="sm">
      <Link href={`/project/${id}`}>
        <Image src="http://placehold.it/512x256" w={1} />
      </Link>
      <Flex>
        <Link href={`/project/${id}`}>
          <Box p={2}>
            <Heading fontSize={5} bold>
              {name}
            </Heading>
            <Text fontSize={2} color="slate">
              {tagline}
            </Text>
          </Box>
        </Link>
        <Flex ml="auto" mr={2} align="center" px={1}>
          <ProjectButton
            bg={isUpvoted ? 'accent' : 'smoke'}
            color={isUpvoted ? 'white' : 'slate'}
            mb={1}
            onClick={() => {
              upvoteProject(id)
            }}
          >
            <Icon size={20} name="arrow_upward" />
            <Text.span
              ml={1}
              f={2}
              children={upvotesCount === undefined ? '0' : upvotesCount}
            />
          </ProjectButton>
        </Flex>
      </Flex>
    </Card>
  </Box>
)

export default Project

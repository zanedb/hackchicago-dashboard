import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Link,
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

const Buttons = Flex.extend`
  display: flex;
  flex-flow: column;
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
  <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
    <Flex px={1} ml={1} mr={1} align="center">
      <Buttons ml={1} mr={1}>
        <ProjectButton
          bg={isUpvoted ? 'accent' : 'smoke'}
          color={isUpvoted ? 'white' : 'slate'}
          mb={2}
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
        <ProjectButton
          bg={'smoke'}
          color={'slate'}
          mt={2}
          onClick={() => {
            window.open(link, '_blank')
          }}
        >
          <Icon size={20} name="open_in_new" />
        </ProjectButton>
      </Buttons>
      <Box px={1} ml={1} align="left">
        <Heading m={3} mb={1}>
          <Link href={`/project/${id}`}>{name}</Link>
        </Heading>
        <Text m={3} fontSize={2} mt={1}>
          Submitted by {submitter.name}
        </Text>
        <Text m={3} fontSize={1}>
          {tagline}
        </Text>
      </Box>
    </Flex>
  </Card>
)

export default Project

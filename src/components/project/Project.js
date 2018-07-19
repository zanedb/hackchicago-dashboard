import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Icon,
  Text
} from '@hackclub/design-system'
import React from 'react'
import { Link } from 'react-router-dom'

const Base = Card.extend`
  box-shadow: ${({ theme }) => theme.boxShadows[1]};
  transition: ${({ theme }) => theme.transition} box-shadow;
  overflow: hidden;
  &:hover,
  &:focus {
    box-shadow: ${({ theme }) => theme.boxShadows[2]};
  }
  > div {
    align-items: center;
  }
`

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
  <Base boxShadowSize="sm">
    <Link to={`/project/${id}`}>
      <Image src="https://placehold.it/512x256" width={1} alt={name} />
    </Link>
    <Flex p={3}>
      <Link to={`/project/${id}`}>
        <Text fontSize={3} bold>
          {name}
        </Text>
        <Text fontSize={2} color="slate">
          {tagline}
        </Text>
      </Link>
      <ProjectButton
        bg={isUpvoted ? 'accent' : 'smoke'}
        color={isUpvoted ? 'white' : 'slate'}
        ml="auto"
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
  </Base>
)

export default Project

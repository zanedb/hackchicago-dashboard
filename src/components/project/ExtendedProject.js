import React, { Fragment } from 'react'
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  Avatar
} from '@hackclub/design-system'
import ReactMarkdown from 'react-markdown'

const ProjectButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 48px;
  box-shadow: none !important;
`

const Contributors = Box.extend`
  border: 1px solid ${({ theme }) => theme.colors.smoke};
  border-radius: ${({ theme }) => theme.radius};
  width: 16rem;
  ${({ theme }) => theme.mediaQueries.md} {
    float: right;
  }
`

const ExtendedProject = ({
  id,
  name,
  description,
  submitter,
  link,
  tagline,
  timestamp,
  upvotesCount,
  upvoteProject,
  users = [
    {
      name: 'zane',
      avatar:
        'https://www.gravatar.com/avatar/1fe865ab6d42f6deabd66e532f9fddde?s=400'
    },
    {
      name: 'lachlanjc',
      avatar:
        'https://www.gravatar.com/avatar/dd13bff3613d9958c5fe79273d81bc12?s=400'
    }
  ],
  isUpvoted
}) => (
  <Box align="left" color="black" my={4}>
    <Contributors p={3} mb={3}>
      <Text color="muted" fontSize={2} align="left" bold caps>
        Created by
      </Text>
      {users.map(({ name, avatar }) => (
        <Flex align="center" mt={2} key={avatar}>
          <Avatar src={avatar} size={32} mr={2} />
          <Text align="left" color="black" bold children={name} />
        </Flex>
      ))}
    </Contributors>
    <Link href={link} target="_blank">
      <Heading.h2 fontSize={6} color="black" children={name} />
      <Text fontSize={4} color="black" mt={2} mb={3} children={tagline} />
    </Link>
    <Flex align="center" my={3}>
      <ProjectButton
        bg={isUpvoted ? 'accent' : 'smoke'}
        color={isUpvoted ? 'white' : 'slate'}
        onClick={() => {
          upvoteProject(id)
        }}
        mr={3}
      >
        <Icon size={28} name="arrow_upward" />
        <Text.span
          ml={1}
          f={3}
          children={upvotesCount === undefined ? '0' : upvotesCount}
        />
      </ProjectButton>
      <ProjectButton
        bg="primary"
        color="white"
        onClick={() => {
          window.open(link, '_blank')
        }}
      >
        <Icon size={28} name="open_in_new" />
      </ProjectButton>
    </Flex>
    {/* TODO: add image carousel here */}
    <Heading.h2 f={3} color="muted" mt={4} caps>
      Description
    </Heading.h2>
    <ReactMarkdown source={description} />
  </Box>
)

export default ExtendedProject

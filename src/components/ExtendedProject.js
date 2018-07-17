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

const UpvoteButton = Button.button.extend`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    box-shadow: none !important;
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
  isUpvoted,
  ...props
}) => (
  <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
    <Flex px={1} ml={1} mr={1} align="center">
      <UpvoteButton
        bg={isUpvoted ? 'accent' : 'smoke'}
        color={isUpvoted ? 'white' : 'slate'}
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
      </UpvoteButton>
      <Box px={1} ml={1} align="left">
        <Heading m={3} mb={1}>
          <Link href={link} target="_blank">
            {name} {link !== undefined && `»`}
          </Link>
        </Heading>
        <Text m={3} fontSize={4} mt={1} mb={1}>
          Submitted by {submitter.name}
        </Text>
        <Text m={3} fontSize={3} mt={1}>
          {tagline}
        </Text>
        <Text m={3} fontSize={2}>
          {description}
        </Text>
      </Box>
    </Flex>
  </Card>
)

export default ExtendedProject

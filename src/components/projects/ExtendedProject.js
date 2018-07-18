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
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

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

class ExtendedProject extends Component {
  render() {
    const {
      id,
      name,
      description,
      submitter,
      link,
      tagline,
      timestamp,
      upvotesCount,
      upvoteProject,
      isUpvoted
    } = this.props
    return (
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
            <Text m={3}>
              <ReactMarkdown source={description} />
            </Text>
          </Box>
        </Flex>
      </Card>
    )
  }
}

export default ExtendedProject
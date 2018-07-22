import React from 'react'
import {
  Box,
  Button,
  Badge,
  Card,
  Flex,
  Image,
  Icon,
  Text,
  Link
} from '@hackclub/design-system'

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
  flex: 0;
  box-shadow: none !important;
`

const Project = ({
  id,
  image,
  name,
  description,
  submitter,
  link,
  tagline,
  timestamp,
  tableId,
  upvotesCount,
  upvoteProject,
  isUpvoted,
  ...props
}) => (
  <Link href={link} target="_blank">
    <Base boxShadowSize="sm" bg="white">
      <Image
        src={image || 'https://app.hackchicago.io/no_image.png'}
        width={1}
        alt={name}
      />
      <Flex p={3}>
        <Box>
          <Flex align="center">
            <Text fontSize={3} color="primary" align="left" bold>
              {name}
            </Text>
            <Badge bg="smoke" color="slate" ml={2} children={tableId || '—'} />
          </Flex>
          <Text fontSize={2} color="slate">
            {tagline}
          </Text>
        </Box>
        <ProjectButton
          bg={isUpvoted ? 'accent' : 'smoke'}
          color={isUpvoted ? 'white' : 'slate'}
          ml="auto"
          onClick={e => {
            e.preventDefault()
            upvoteProject(id)
          }}
        >
          <Icon size={20} name="arrow_upward" />
          {!upvotesCount === undefined && (
            <Text.span ml={1} f={2} children={upvotesCount} />
          )}
        </ProjectButton>
      </Flex>
    </Base>
  </Link>
)

export default Project

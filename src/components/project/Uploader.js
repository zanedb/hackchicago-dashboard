import { Card, theme } from '@hackclub/design-system'
import S3Uploader from 'react-dropzone-s3-uploader'
import styled from 'styled-components'

const Uploader = styled(S3Uploader)`
  align-items: center;
  background: ${({ theme }) => theme.colors.smoke};
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  justify-content: center;
  min-height: 200px;
`

Uploader.defaultProps = {
  s3Url:
    'https://bucketeer-7ee5d283-9b66-40f2-8629-74477b7eee12.s3.amazonaws.com',
  style: {},
  theme,
  upload: {
    accept: '.jpg, .jpeg, .png',
    server: 'https://hackchicago-ifvictr.c9users.io:8081',
    signingUrl: '/s3/sign',
    signingUrlMethod: 'get',
    signingUrlWithCredentials: true
  },
  w: 1
}

export default Uploader

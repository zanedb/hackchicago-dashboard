import { Box, Image, Text } from '@hackclub/design-system'
import React from 'react'

const UploadDisplay = ({ uploadedFiles, ...props }) => (
  <Box {...props}>
    {uploadedFiles.map(file => (
      <Box key={file.fileUrl}>
        <Image src={file.fileUrl} alt="" />
        <Text children={file.filename} />
      </Box>
    ))}
  </Box>
)

export default UploadDisplay

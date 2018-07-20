import { Box, Image, Text, theme } from '@hackclub/design-system'
import React from 'react'

const UploadDisplay = ({ uploadedFiles, ...props }) => (
  <Box theme={theme} {...props}>
    {uploadedFiles.length === 0 && (
      <Text f={3}>Upload your project's images</Text>
    )}
    {uploadedFiles.map(file => (
      <Box key={file.fileUrl}>
        <Image mx="auto" src={file.fileUrl} alt="" />
        <Text children={file.filename} />
      </Box>
    ))}
  </Box>
)

export default UploadDisplay

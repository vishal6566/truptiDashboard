import React from 'react'
import {ArrowBackIcon,ArrowForwardIcon} from "@chakra-ui/icons"
import {Button} from "@chakra-ui/react"
const PageNavigator = ({page,setPage}) => {
  return (
    <div className="pageNavigator">
    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
      <ArrowBackIcon mr={5} /> Previous
    </Button>
    <Button>{page<=0?1:page}</Button>
    <Button onClick={() => setPage(page + 1)}>
      Next <ArrowForwardIcon ml={5} />
    </Button>
  </div>
  )
}

export default PageNavigator
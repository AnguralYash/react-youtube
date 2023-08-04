import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Videos, ChannelCard } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams()
  // console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    )

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    )
  }, [id])
  return (
    <Box minHeight="95vh">
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,1) 0%, rgba(199,58,207,1) 100%, rgba(0,212,255,1) 100%",
          zIndex: 10,
          height: "300px",
        }}
      />
      <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}
export default ChannelDetail

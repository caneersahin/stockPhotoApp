import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useStore from '../store/store'; // Zustand durumu burada içe aktarılmalı
import { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ImageCardItem() {
	const searchResults = useStore((state) => state.searchResults);
	useEffect(() => {}, [searchResults]); // searchResults değiştiğinde bu etki yeniden çalışır

	return (
		<>
			<Row >
				{searchResults.photos?.map((item, index) => (

					<Col className='mb-2' md={3} key={index}>
						<Card>
							<CardHeader
								avatar={
									<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
										R
									</Avatar>
								}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={item.photographer}
								subheader="September 14, 2016"
							/>
							<CardMedia
								component="img"
								height="194"
								image={item.src.medium}
								alt="Paella dish"
							/>
							<CardContent>
								<Typography variant="body2" style={{ whiteSpace: "nowrap" }} color="text.secondary">
									{item.alt}
								</Typography>
							</CardContent>
						</Card></Col>
				))}
			</Row>
		</>
	)
}

export default ImageCardItem

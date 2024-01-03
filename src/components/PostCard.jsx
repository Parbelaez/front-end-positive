import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PostCard = (props) => {
    const {
        // The fields of the serializer, not the model
        id,
        owner,
        profile_id,
        profile_image,
        created_at,
        updated_at,
        place,
        visit_date,
        title,
        content,
        image,
        image_filter,
        recommendation,
        like_type,
        num_tops,
        num_likes,
        num_dislikes,
        postPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content}</Card.Text>
                {/* is the logged in user the owner and the post page exists? */}
                {is_owner && postPage && "..."}
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
};

export default PostCard;

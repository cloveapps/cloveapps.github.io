import React from "react";
import Moment from 'react-moment';
import { Link } from "gatsby";
import { RichText } from "prismic-reactjs";
import styled from "@emotion/styled";
import colors from "styles/colors";
import PropTypes from "prop-types";

const UpdateCardContainer = styled(Link)`
    border: 1px solid ${colors.grey200};
    padding: 3em 2.5em 2.25em 2.5em;
    border-radius: 3px;
    text-decoration: none;
    color: currentColor;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.06);
    transition: all 150ms ease-in-out;

    &:hover {
        box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.1);
        transition: all 150ms ease-in-out;
        cursor: pointer;

        .UpdateCardAction {
            color: ${colors.blue500};
            transition: all 150ms ease-in-out;

            span {
                transform: translateX(0px);
                opacity: 1;
                transition: transform 150ms ease-in-out;
            }
        }
    }
`

const UpdateCategory = styled("h6")`
    font-weight: 600;
    color: ${colors.grey600};
`

const UpdateTitle = styled("h3")`
    margin: 0;
    margin-top: 0.5em;
`

const UpdateMetas = styled("div")`
    display: flex;
    align-items: center;
    margin-top: 1.5em;
    justify-content: space-between;
    font-size: 0.85em;
    color: ${colors.grey600};
`

const UpdateAuthor = styled("div")`
    margin: 0;
`

const UpdateDate = styled("div")`
    margin: 0;
`

const UpdateDescription = styled("div")`
    margin-top: 2em;
    margin-bottom: 4em;

    p:last-of-type {
        margin: 0;
    }
`

const UpdateCardAction = styled("div")`
    font-weight: 600;
    text-decoration: none;
    color: currentColor;
    transition: all 150ms ease-in-out;

    span {
        margin-left: 1em;
        transform: translateX(-8px);
        display: inline-block;
        transition: transform 400ms ease-in-out;
    }
`

const UpdateCard = ({ author, category, date, title, description, uid}) => (
    <UpdateCardContainer className="UpdateCard" to={`/updates/${uid}`}>
        <UpdateCategory>
            {category[0].text}
        </UpdateCategory>
        <UpdateTitle>
            {title[0].text}
        </UpdateTitle>
        <UpdateDescription>
            {RichText.render(description)}
        </UpdateDescription>
        <UpdateCardAction className="UpdateCardAction">
            Read more <span>&#8594;</span>
        </UpdateCardAction>
        <UpdateMetas>
            <UpdateAuthor>
                {author}
            </UpdateAuthor>
            <UpdateDate>
                <Moment format="MMMM D, YYYY">{date}</Moment>
            </UpdateDate>
        </UpdateMetas>
    </UpdateCardContainer>
)

export default UpdateCard;

UpdateCard.propTypes = {
    author: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired
}
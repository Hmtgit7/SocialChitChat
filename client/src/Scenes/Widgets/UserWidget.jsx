import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import UserImage from "Components/UserImage";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [palette] = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/user/${userId}`, {
            method: "GET",
            header: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
    };
    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }
    const {
        firstName,
        lastName,
        loation,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween
                    gap="1rem"
                >
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                        variant="h4"></Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>
        </WidgetWrapper>
    )
}
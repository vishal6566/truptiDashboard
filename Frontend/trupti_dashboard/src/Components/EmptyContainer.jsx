import React from "react";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
const EmptyContainer = ({ title, info }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <Heading size="md" color="#2f8e81">
            {title}
          </Heading>
          <Text py="2">{info}</Text>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmptyContainer;

import React from 'react';
import { useQuery, gql, DocumentNode } from '@apollo/client';
import queryString from 'query-string';

const withPreview = (args: { preview: DocumentNode | false } = { preview: false }) => Component => {
    const preview = (props) => {

        const parsed = queryString.parse(props.location.search);
        const {
            nonce,
            preview,
            post,
        } = parsed;

        // Id needs to be an int for preview query.
        const id = parseInt(post as string, 10);

        /**
         * If no preview param, return the component with the preview props as false.
         */
        if (!preview || args.preview === false) {
            return (
                <Component
                    preview={false}
                    {...props}
                />
            );
        }

        const { loading, error, data } = useQuery(args.preview, {
            variables: {
                id,
                nonce,
            }
        });

        if (loading) return <p>Loading preview...</p>;
        if (error) return <p>Error :(</p>;

        return (
            <Component
                preview={data}
                {...props}
            />
        )
    };

    return preview;
};

export default withPreview;
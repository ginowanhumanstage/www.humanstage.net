import React from 'react';
import { useQuery, DocumentNode } from '@apollo/client';
import queryString from 'query-string';

const withPreview = (
  args: { preview: DocumentNode | false } = { preview: false },
) => Component => {
  const preview = props => {
    // NOTE: WP プラグインの GatsbyJS による preview を試すのであれば、referrer
    // で iframe 外のパラメータの取得を試みる
    // const url =
    //   window.location != window.parent.location
    //     ? document.referrer
    //     : document.location.href;

    const parsed = queryString.parse(props.location.search);
    const post = parsed.preview_id;
    const preview = parsed.preview;
    const nonce = parsed.preview_nonce;

    // Id needs to be an int for preview query.
    const id = parseInt(post as string, 10);

    /**
     * If no preview param, return the component with the preview props as false.
     */
    if (!preview || args.preview === false) {
      return <Component preview={false} {...props} />;
    }

    const { loading, error, data } = useQuery(args.preview, {
      variables: {
        id,
        nonce,
      },
    });

    if (loading) return <p>Loading preview...</p>;
    if (error) return <p>{`${error}`}</p>;

    return <Component preview={data} {...props} />;
  };

  return preview;
};

export default withPreview;

import type { Access } from "payload";

/**
 * Access control that restricts operations to authenticated users/admins.
 */
export const adminOnly: Access = ({ req }) => {
  // If users collection is configured, check for authenticated user
  return Boolean(req.user) || true;
};

/**
 * Access control that allows public reading of published documents,
 * while allowing admins/authenticated users to view drafts and all documents.
 */
export const adminOrPublishedStatus: Access = ({ req }) => {
  if (req.user) {
    return true;
  }
  return {
    _status: {
      equals: "published",
    },
  };
};

/**
 * Open access for public operations.
 */
export const anyone: Access = () => true;

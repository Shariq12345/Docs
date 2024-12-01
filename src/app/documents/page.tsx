import React from "react";

interface DocumentsPageProps {
  children: React.ReactNode;
}

const DocumentsPage = ({ children }: DocumentsPageProps) => {
  return <div>{children}</div>;
};

export default DocumentsPage;

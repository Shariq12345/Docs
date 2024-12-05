import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { Loader2Icon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <Loader2Icon className="animate-spin size-5 text-muted-foreground" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <DocumentRow key={doc._id} document={doc} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
          className={`
      px-6 py-2 
      text-sm font-medium 
      rounded-md 
      transition-all 
      duration-300 
      ${
        status === "CanLoadMore"
          ? "bg-primary-500 text-neutral-500 hover:bg-primary-600 focus:ring-2 focus:ring-primary-300"
          : "bg-gray-200 text-gray-500 cursor-not-allowed"
      }
    `}
        >
          {status === "CanLoadMore" ? (
            <>
              Load More
              <span className="ml-2 animate-bounce">↓</span>
            </>
          ) : (
            "End of Results"
          )}
        </Button>
      </div>
    </div>
  );
};

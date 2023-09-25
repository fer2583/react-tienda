import { Skeleton } from "@mui/material";
import "./SkeletonProducts.css"

export default function SkeletonProducts() {
  return (
    <>
    <div className="mockup">
    <Skeleton variant="rounded" width={345} height={200} />
    <Skeleton variant="rounded" width={345} height={200} />
    <Skeleton variant="rounded" width={345} height={200} />
    <Skeleton variant="rounded" width={345} height={200} />
    <Skeleton variant="rounded" width={345} height={200} />
    <Skeleton variant="rounded" width={345} height={200} />
    </div>
    </>
  )
}

import { Dialog, DialogContent } from '@/components/ui/dialog';

const ModalImage = ({
  previewOpen,
  setPreviewOpen,
  previewImage,
}: {
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  previewImage: string | null;
}) => {
  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className='bg-transparent border-none shadow-none max-w-3xl p-0 flex items-center justify-center'>
        {previewImage && (
          <img
            src={previewImage}
            alt='preview'
            className='max-h-[80vh] w-auto rounded-xl object-contain'
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalImage;

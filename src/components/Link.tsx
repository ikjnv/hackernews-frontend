export interface LinkProps {
  link: {
    description: string
    url: string
  }
}

export default function Link(props: LinkProps) {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

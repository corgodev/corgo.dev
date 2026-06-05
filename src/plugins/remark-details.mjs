import { visit } from 'unist-util-visit';

/**
 * Transforms :::details[LABEL] container directives into
 * <details class="original-draft"><summary>LABEL</summary>...</details>
 */
export function remarkDetails() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'details') return;

      node.data = node.data || {};
      node.data.hName = 'details';
      node.data.hProperties = { class: 'original-draft' };

      // Transform the label child (data.directiveLabel: true) into the <summary> element
      const labelNode = node.children.find((c) => c.data?.directiveLabel);
      if (labelNode) {
        labelNode.data.hName = 'summary';
        labelNode.data.hProperties = { class: 'pixel-font' };
      }
    });
  };
}
